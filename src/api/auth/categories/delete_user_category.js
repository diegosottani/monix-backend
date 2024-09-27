import { supabase } from '../../../init.js';
import { categoryOnDefault } from "../../../database/updateDefaultOnDelete.js";

export const delete_user_category = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    if (!id) {
      res.status(400).json({ error: 'O id da categoria é obrigatório' });
    }

    await categoryOnDefault(id, userId);

    const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

    if (error) throw error;

    res.status(200).send("Categoria excluída com sucesso")
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    res.status(500).json({ error: 'Erro ao excluir categoria' });
  }
};