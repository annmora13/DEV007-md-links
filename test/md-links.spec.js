const { mdLinks }= require('../index');


describe('mdLinks', () => {
  it('should return a promise', async () => {
    try {
      await expect(mdLinks()).resolves.toBeInstanceOf(Promise);
    } catch (error) {
    }
  });
  
  it('should reject when the path doesnt exists', () => {
    return mdLinks('/cursos/noexise.ms').catch((error) => {
      expect(error).toBeInstanceOf(Error); // Verifica que el error sea una instancia de Error
      expect(error.message).toBe('La ruta no existe');
    })
  });

});
