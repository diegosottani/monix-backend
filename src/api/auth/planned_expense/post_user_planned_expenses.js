import { supabase } from '../../../init.js';

export const post_user_planned_expense = async (req, res) => {
    try {
        const year = parseInt(req.body.year);
        
        if (isNaN(year)) {
            res.status(400).json({ error: 'É necessário informar o ano' });
            return;
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

        const { error } = await supabase.from('planned_expense').insert(entries);

        if (error) {
            throw error;
        }

        res.status(201).send('Planejamento de despesa criada com sucesso');
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error);
    }

}