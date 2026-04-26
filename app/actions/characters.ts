"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getCharacters(type?: string) {
  try {
    const characters = await prisma.character.findMany({
      where: type ? { type: type } : undefined,
      orderBy: { name: 'asc' }
    });
    return characters;
  } catch (error) {
    console.error("Error fetching characters:", error)
    return []
  }
}

export async function createCharacter(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const type = formData.get("type") as string
    const health = parseInt(formData.get("health") as string)
    const attack = parseInt(formData.get("attack") as string)
    const defense = parseInt(formData.get("defense") as string)
    const speed = parseInt(formData.get("speed") as string)

    if (!name || !type || isNaN(health) || isNaN(attack) || isNaN(defense) || isNaN(speed)) {
      return { error: "Todos los campos numéricos deben ser válidos." }
    }

    const newChar = await prisma.character.create({
      data: {
        name,
        type,
        health,
        attack,
        defense,
        speed
      }
    })

    revalidatePath("/characters")
    revalidatePath("/simulator")
    
    return { success: true, character: newChar };
  } catch (error) {
    console.error("Error al crear personaje:", error)
    return { error: "Ocurrió un error al guardar en la base de datos." }
  }
}

export async function deleteCharacter(id: string) {
    try {
        await prisma.character.delete({
            where: { id }
        });
        revalidatePath("/characters")
        revalidatePath("/simulator")
        return { success: true }
    } catch (error) {
        console.error("Error delete:", error)
        return { error: "No se pudo eliminar" }
    }
}

export async function upgradeCharacterStat(id: string, statName: "health" | "attack" | "defense" | "speed") {
  try {
    const char = await prisma.character.findUnique({ where: { id }});
    if (!char || char.statPoints <= 0) return;

    const increment = statName === "health" ? 10 : 1; // +10 HP or +1 rest
    
    await prisma.character.update({
      where: { id },
      data: {
        statPoints: char.statPoints - 1,
        [statName]: char[statName] + increment
      }
    });

    revalidatePath("/characters");
    revalidatePath("/simulator");
  } catch(error) {
    console.error("Error upgrading stat:", error);
  }
}

