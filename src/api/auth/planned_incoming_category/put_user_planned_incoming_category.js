import { supabase } from '../../../init';

export const put_user_planned_incoming_category = async (req, res) => {
  try {
    const planned_incoming_id = req.params.id;
    const { category_id, value } = req.body;

    if (!planned_incoming_id || !category_id || isNaN(value)) {
      res.status(400).json({ error: 'É necessário preencher todos os campos' });
    }

    const { error } = await supabase
      .from('planned_incoming_category')
      .update({
        planned_incoming_id,
        category_id,
        value
      })
      .eq('id', planned_incoming_id);

    if (error) {
      throw error;
    }

    res.status(200).send("Categoria de entrada planejada atualizada com sucesso");
  } catch (error) {
    console.error('Erro ao atualizar categoria de entrada planejada:', error);
    res.status(500).json(error);
  }
};
