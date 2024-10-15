import { supabase } from '../../../init.js';

export const delete_user_incomings = async (req, res) => {
  try {
    const incomingId = req.params.id;

    if (!incomingId) {
      return res.status(400).json({ error: 'O id da entrada é obrigatório' });
    }

    const { error } = await supabase
      .from('incomings')
      .delete()
      .eq('id', incomingId);

    if (error) {
      throw error;
    }

    return res.status(200).send("Entrada excluída com sucesso");
  } catch (error) {
    console.error('Erro ao excluir entrada:', error);
    return res.status(500).json({ error: 'Erro ao excluir entrada' });
  }
};