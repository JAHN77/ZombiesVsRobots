"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type BattleLogEntry = {
  turn: number;
  attackerName: string;
  defenderName: string;
  damage: number;
  defenderRemainingHealth: number;
};

export type BattleResult = {
  winnerId: string;
  loserId: string;
  winnerName: string;
  loserName: string;
  turns: number;
  logs: BattleLogEntry[];
};

export async function getHistoricalBattles() {
  try {
    return await prisma.battle.findMany({
      include: {
        character1: true,
        character2: true,
        winner: true
      },
      orderBy: { id: 'desc' } // Prisma usually orders CUID by creation time relatively, or we can just fetch last ones mapping
    });
  } catch (error) {
    console.error("Error fetching battles:", error);
    return [];
  }
}

export async function simulateCombat(c1Id: string, c2Id: string): Promise<{error?: string, result?: BattleResult}> {
  try {
    const char1 = await prisma.character.findUnique({ where: { id: c1Id }});
    const char2 = await prisma.character.findUnique({ where: { id: c2Id }});

    if (!char1 || !char2) {
      return { error: "Personajes no encontrados." };
    }

    let p1 = { ...char1 };
    let p2 = { ...char2 };

    // Determinar orden por velocidad
    let attacker = p1.speed >= p2.speed ? p1 : p2;
    let defender = p1.speed >= p2.speed ? p2 : p1;

    let turnsCounter = 0;
    const combatLogs: BattleLogEntry[] = [];

    while (p1.health > 0 && p2.health > 0 && turnsCounter < 100) {
      turnsCounter++;

      // dmg = attack - (defense * 0.5)
      // Redondear para evitar decimales infinitos, mínimo daño 1
      let rawDamage = attacker.attack - (defender.defense * 0.5);
      let calcDamage = Math.max(1, Math.round(rawDamage));

      defender.health -= calcDamage;
      if (defender.health < 0) defender.health = 0;

      combatLogs.push({
        turn: turnsCounter,
        attackerName: attacker.name,
        defenderName: defender.name,
        damage: calcDamage,
        defenderRemainingHealth: defender.health
      });

      if (defender.health <= 0) break;

      // Swap roles
      let temp = attacker;
      attacker = defender;
      defender = temp;
    }

    const winner = p1.health > 0 ? p1 : p2;
    const loser = p1.health > 0 ? p2 : p1;

    // Nivelación / XP Logic para el ganador
    let newXp = winner.experience + 50;
    let newLevel = winner.level;
    let newStatPoints = winner.statPoints;

    if (newXp >= 100) {
      newXp -= 100;
      newLevel += 1;
      newStatPoints += 2;
      combatLogs.push({
        turn: turnsCounter + 1,
        attackerName: "SISTEMA",
        defenderName: winner.name,
        damage: 0,
        defenderRemainingHealth: winner.health,
      });
    }

    // Guardar en la base de datos
    await prisma.$transaction([
      prisma.battle.create({
        data: {
          character1Id: char1.id,
          character2Id: char2.id,
          winnerId: winner.id,
          turns: turnsCounter
        }
      }),
      prisma.character.update({
        where: { id: winner.id },
        data: {
          experience: newXp,
          level: newLevel,
          statPoints: newStatPoints
        }
      })
    ]);

    revalidatePath("/history");
    revalidatePath("/characters");
    revalidatePath("/simulator");

    return {
      result: {
        winnerId: winner.id,
        loserId: loser.id,
        winnerName: winner.name,
        loserName: loser.name,
        turns: turnsCounter,
        logs: combatLogs
      }
    };
  } catch (error) {
    console.error("Error simulation:", error);
    return { error: "Ocurrió un fallo persistiendo u operando la simulación." };
  }
}
