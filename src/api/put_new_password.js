import { supabase } from "../init.js";

export const put_new_password = async (req, res) => {
  try {
    const { password, authToken } = req.body;

    if(!password && !authToken) {
      res.status(400).json({ error: 'É necessário informar a senha' });
    }

    const {error} = await supabase.auth.updateUser(authToken, { password });
    
    if (error) throw error;

    res.status(201).send("Senha atualizada com sucesso");
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao atualizar senha");
  }
}
