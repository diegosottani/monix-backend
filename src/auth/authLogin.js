import { supabase } from "../init.js";

export const authLogin = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    };
  } catch (err) {
    console.error("Error during email/password login", err.message);
    throw err;
  }
};

export const handleGoogleCallback = async (idToken) => {
  try {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    });
    
    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Error handling Google callback", err.message);
    throw err;
  }
};
