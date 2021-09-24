import { createStore, combineReducers } from 'redux'

// People dropping off a form (Action creator)
const createPolicy = (name, amount) => {
  return { // Action
    type: 'CREATE_POLICY',
    payload: {
      name,
      amount
    }
  }
};

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name
    }
  }
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name,
      amountOfMoneyToCollect
    }
  }
}

// Reducers (departments)
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    return [ ...oldListOfClaims, action.payload ]
  }

  return oldListOfClaims;
};


const acounting = (bagofmoney = 100, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return bagofmoney - action.payload.amountOfMoneyToCollect
  } else if (action.type === 'CREATE_POLICY') {
    return bagofmoney + action.payload.amount;
  }

  return bagofmoney;
};

const policies = (listofPolicies = [],  action) => {
  if (action.type === 'CREATE_POLICY') {
    return [ ...listofPolicies, action.payload.name ];
  } else if( action.type === 'DELETE_POLICY') {
    return listofPolicies.filter((policy) => policy !== action.payload.name);
  }

  return listofPolicies;
};

const ourDepartamennts = combineReducers({
  acounting: acounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartamennts);

console.log('Dispatched');

store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Jim', 30));
store.dispatch(createPolicy('Bob', 40));

console.log('State when added 3 plicies: ', store.getState());

store.dispatch(createClaim('Alex', 120));
store.dispatch(createClaim('Jim', 50));

console.log('State when added 2 claims: ', store.getState());


store.dispatch(deletePolicy('Bob'))

console.log('The state of store at the end is: ' , store.getState())
