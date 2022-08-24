import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useContext } from "react";
import ValidacoesCadastro from "../../contexts/ValidacoesCadastro";

export default function DadosUsuario({ aoEnviar }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const validacoes = useContext(ValidacoesCadastro);
  
  const [erros, setErros] = useState({ senha: { valido: true, texto: "" } })
  function validarCampos(e) {
    const { name, value } = e.target;
    const novoEstado = { ...erros };
    novoEstado[name] = validacoes[name](value);
    setErros(novoEstado);
  }

  function possoEnviar() {
    for(let campo in erros) {
      if(!erros[campo].valido) {
        return false;
      }
    }
    return true;
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (possoEnviar()) {
        aoEnviar({ email, senha });
      }
    }}>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        label="Email"
        name="email"
        type="email"
        variant="outlined"
        margin="normal"
        required
        fullWidth
      />
      <TextField
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        onBlur={validarCampos}
        error={!erros.senha.valido}
        helperText={erros.senha.texto}
        id="senha"
        label="Senha"
        name="senha"
        type="password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Próximo
      </Button>
    </form>
  );
}