import prisma from "../api/lib/prisma.js"

export const getChats = async (req, res) => {
    const userId = req.userId;
    try {
        const chats = await prisma.chat.findMany({
            where: {
                userIds: {
                    hasSome: [userId]
                }
            }
        });

        for (const chat of chats) {
            const receiverId = chat.userIds.find((id) => id !== userId);
   console.log(receiverId)
            if (receiverId) {  // Ensure receiverId is not undefined
                const receiver = await prisma.user.findUnique({
                    where: {
                        id: receiverId,
                    },
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                      },
                });
                chat.receiver = receiver;
            } else {
            }
        }

        res.status(200).send(chats);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
export const getChat = async (req, res) => {
    const userId = req.userId;
    try {
        const chats = await prisma.chat.findUnique({
            where: {
                id: req.params.id,
                userIds: {
                    hasSome: [userId]
                }
            },
            include: {
                message: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }

        });

        await prisma.chat.update({
            where:{
                id: req.params.id
            },
            data: {
                seenBy: {
                    push:[userId]
                }
     } 
    })

        res.status(200).send(chats)

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error while getting chats" });
    }
}
export const addChat = async (req, res) => {
    const userId = req.userId;


    try {
        const newChat = await prisma.chat.create({
            data: {
                userIds: [userId, req.body.receiverId]
            }
        });
        res.status(200).send(newChat)

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error });
    }
}
export const readChat = async (req, res) => {
    const userId = req.userId;
    try {
        const chat = await prisma.chat.update({
          where: {
            id: req.params.id,
            userIds:{
                hasSome: {userId}
            }
          },
          data: {
            seenBy: {
                set: [userId]
          }
        }
        });
        res.status(200).send(chat)

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error while reading chats" });
    }
}
