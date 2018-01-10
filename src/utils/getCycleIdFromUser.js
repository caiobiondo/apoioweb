const getCycleIdFromUser = user => {
  return (
    user &&
    user.estrutura &&
    user.estrutura.ciclo &&
    user.estrutura.ciclo[0] &&
    user.estrutura.ciclo[0].numero &&
    String(user.estrutura.ciclo[0].numero)
  );
};

export default getCycleIdFromUser;
