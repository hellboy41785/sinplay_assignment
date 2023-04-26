import { getLocalData, updateLocalData } from '@/utils/localdata'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IProducts } from '../../../types/products'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const data: IProducts[] = await getLocalData()
            res.status(200).json(data)

        } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(500).send({ error: err.message });
            } else {
                res.status(500).send({ error: 'An unknown error occurred' });
            }
        }
    } else if (req.method === 'POST') {
        try {
            const { id, title, description, thumbnail } = req.body
            const data = await updateLocalData({
                id, title, description, thumbnail
            })
            res.status(200).json(data)

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err)
                res.status(500).send({ error: err.message });
            } else {
                res.status(500).send({ error: 'An unknown error occurred' });
            }
        }
    } else {
        res.status(200).json({ name: 'John Doe' })
    }
}
