import request from 'supertest'
import app from '../index.js'
import cafes from './cafes.json' assert { type: 'json' }

describe('Operaciones CRUD de cafes', () => {
  test('prueba GET /cafes', async () => {
    const response = await request(app).get('/cafes');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(cafes); 
  });

  //supongo yo que funciono porque lo hice fallar quintandole el import de cafes para que me muestre que esta comparando y era lo que esperaba recibir

  test('prueba 404 por falta de ID', async () => {
    const idInexistente = 999;
    const response = await request(app)
      .delete(`/cafes/${idInexistente}`)
      .set('Authorization', 'no existe token');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No se encontró ningún cafe con ese id');
  });

  //creo que esta pregunta es trampa para mi me pide que sea esperado 404 al tener id equivocado?
  // tarde muchisimo en darme cuenta de que se necesitaba un token cualquiera, no se siento que tengo un candado sin cerrar 
  //aunque aun no se porque no funcionaba mi headers en el codigo anterior porque veo que asi si funciona (obvio debia funcionar)

  test('prueba POST/cafes', async () => {
    const newCafe = {
      id: 5,
      name: 'Doble Batido Expreso Choca Moka Edicion Especial con Nombre Largo Porque Estoy Aburrido De Estar Sentado',
    };
    const response = await request(app)
      .post('/cafes')
      .send(newCafe);
    expect(response.status).toBe(201);
    expect(response.body).toContainEqual(newCafe);
  });
  //se probo intentando agregar un cafe ya existente para que fallara, luego se probo uno nuevo con nombre distinto e id diferente y funciono

  test('prueba PUT/cafes', async () => {
    const id = 6; 
    const updatedCafe = {
      id: 5,
      name: 'Café Modificado',
    };
    const response = await request(app)
      .put(`/cafes/${id}`)
      .send(updatedCafe);
    expect(response.status).toBe(400);
    expect(response.status).toEqual(400);
  });
})
 // no se si me desvie con el sentido de la logica, pero ahora busque que el objetivo del codigo era que fallara
 // ahora si el objetivo del codigo era que fallara aproposito en medio del test ya me paso eso en todo el dia que estuve aqui 😅
 // tanto asi que el deleted 404 hice que fuera por romper la pagina en vez de no encontrar el id 🤣 en vez de detener el carro lo tire por el barranco porque tuve problemas
 // pdt ya lo arregle