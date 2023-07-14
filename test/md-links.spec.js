const { mdLinks }= require('../index');


describe('mdLinks', () => {

  // it('should return a promise', () => {
  //   expect (mdLinks()).toBe(typeof Promise);
  // });

  it('should reject when the path doesnt exists', () => {
    return mdLinks('/cursos/noexise.ms').catch((error) => {
      expect(error).toBe('La ruta no existe');
    })
  });

});
