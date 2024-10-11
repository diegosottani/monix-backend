import { supabase } from "../init.js";

export const put_new_password = async (req, res) => {
  try {
    const { password, access_token, refresh_token } = req.body;

    if(!password) {
      res.status(400).json({ error: 'É necessário informar a senha' });
    }

    if(!access_token) {
      res.status(403).json({ error: 'Token inválido' });
    }

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) throw error;

    const { error: updateError } = await supabase.auth.updateUser({
      password
    });
    
    if (updateError) throw error;

    res.status(201).send("Senha atualizada com sucesso");
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao atualizar senha");
  }
}
