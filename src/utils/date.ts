export const formatarDataCriacao = (dataCriacao?: string) => {
  if (!dataCriacao) {
    return 'Data indisponível';
  }

  const match = dataCriacao.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/
  );

  if (!match) {
    return dataCriacao;
  }

  const [, ano, mes, dia, hora, minuto] = match;

  return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
};
