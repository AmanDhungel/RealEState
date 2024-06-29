import prisma from "../api/lib/prisma.js"

export const addMessage= async(req, res) => {
    const userId = req.userId;
    const chatId = req.params.chatId;
    const text = req.body.text;

    try {
      const chat = await prisma.chat.findUnique({
        where:{
            id: chatId,
            userIds:{
                   hasSome: [userId]
            }
        }
      })
      if(!chat) return res.status(404).json({message: "chat not found"})
        
        const message = await prisma.message.create({
            data: {
                text: text,
                chatId,
                userId
            }
        })

        await prisma.chat.update({
            where: {id: chatId},
            data: {seenBy:[userId],
                lastMessage: text
            }
        })
        
        res.status(200).send(message)
             
    } catch (error) {
        res.status(500).json({message: error});
    }
}
