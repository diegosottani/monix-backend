import { supabase } from '../../../init.js';

export const put_user_typeofexpenses = async (req, res) => {
  try {
    const typesofexpensesId = req.params.id;
    const updatedtypesofexpenses = {
      id: req.body.id,
      user_id: req.user.id,
      ENUM: req.body.ENUM
    };

    const { error } = await supabase
      .from('type_expenses')
      .update(updatedtypesofexpenses)
      .eq('id', typesofexpensesId);

    if (error) {
      throw error;
    }

    return res.status(200).send("Tipo de despesa atualizada com sucesso");
  } catch (error) {
    console.error('Erro ao atualizar o tipo de despesa:', error);
    return res.status(500).json({ error: 'Erro ao atualizar o tipo despesa' });
  }
};
