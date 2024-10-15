import { supabase } from "../init.js";

export const post_new_user_login = async (req, res) => {
  try {
    const { access_token, refresh_token } = req.body;

    if(!access_token) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) throw error;

    return res.status(201).send("Novo login realizado com sucesso");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro entrar com novo login");
  }
}
