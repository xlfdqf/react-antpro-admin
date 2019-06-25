import {queryList} from '../services/api.js';

export default({
	namespace:'bike',
	state:{
		list:[]
	},
	effects:{
       *initLoad({payload},{call,put}){
          const res = yield call(queryList,payload);
          yield put({
            type:'show',
            payload:res,
          });
       }
	},
	reducers:{
        show(state,action){
            return {
            	...state,
            	list:action.payload
            }
        }
	}
})