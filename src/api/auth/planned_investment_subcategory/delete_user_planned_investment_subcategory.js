import { supabase } from '../../../init.js';

export const delete_user_planned_investment_subcategory = async (req, res) => {
    try {
        const planned_investment_subcategory_id = req.params.id;

        if (!planned_investment_subcategory_id) {
            return res.status(400).json({ error: 'O id da subcategoria de despesa planejada é obrigatório' });
        }

        const { error } = await supabase
            .from('planned_investment_subcategory')
            .delete()
            .eq('id', planned_investment_subcategory_id);

        if (error) {
            throw error;
        }
        
        return res.status(200).send("Subcategoria de despesa planejada excluída com sucesso");
        } catch (error) {
            console.error('Erro ao excluir subcategoria de despesa planejada:', error);
            return res.status(500).json({ error: 'Erro ao excluir subcategoria de despesa planejada' });
        }
    };