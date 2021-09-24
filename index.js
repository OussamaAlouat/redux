
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
    return [ ...oldListOfClaims, payload ]
  }

  return oldListOfClaims;
};


const acounting = (bagofmoney, action) => {
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
}
