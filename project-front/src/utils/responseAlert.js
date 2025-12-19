export const responseAlert = (state, action) => {
    let status = action.payload.status
    switch(status){
        case(500):
          alert(action.payload.message ? action.payload.message : "Произошла ошибка на сервере. Попробуйте позже")
          break;
        case(400):
          alert(action.payload.message ? action.payload.message : "Ваш запрос не был найден.")
          break;
        case(200):
          if(action.payload.message) alert( action.payload.message )
          state.status = "loaded"
          state.data = action.payload
          break;
        default:
          alert("Произошла неизвестная ошибка")
      }
}