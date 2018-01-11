export const getCycleIdFromUser = user => {
  return (
    user &&
    user.estrutura &&
    user.estrutura.ciclo &&
    user.estrutura.ciclo[0] &&
    user.estrutura.ciclo[0].numero &&
    String(user.estrutura.ciclo[0].numero)
  );
};

export const getCommercialStructureIdFromUser = user => {
  return user && user.estrutura && user.estrutura.codigo;
};

export const getCommercialStructureTypeIdFromUser = user => {
  return user && user.estrutura && user.estrutura.codigoTipo;
};
