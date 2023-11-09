export const migrator = <T, K>(dto: T, mapper: () => K): K => {
  try {
    return mapper();
  } catch (error) {
    console.error(error);
    return dto as unknown as K;
  }
};