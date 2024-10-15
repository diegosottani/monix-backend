import { supabase } from '../../../init.js';

export const post_user_planned_incoming = async (req, res) => {
    try {
        const year = parseInt(req.body.year);
        
        if (isNaN(year)) {
            return res.status(400).json({ error: 'É necessário informar o ano' });
        }

        const entries = [];
        // São 13 indexes. Sendo de 1 a 12 para os meses e 0 para ano inteiro.
        for (let index = 0; index <= 12; index++) {
            entries.push({
                user_id: req.user.id,
                month: index,
                year,
            })
        }

        const { error } = await supabase.from('planned_incoming').insert(entries);

        if (error) throw error;

        return res.status(201).send('Planejamento de Entrada criado com sucesso');
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(error);
    }
}
