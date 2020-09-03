const mapping = {
  'AWS::ApiGateway::Model' : {
    groupName: 'GatewayModels',
    counter: 0,
  },
  'AWS::ApiGateway::Method': {
    groupName: 'GatewayMethods',
    counter: 0,
  },
  'AWS::ApiGateway::Resource': {
    groupName: 'GatewayResources',
    counter: 0,
  },
  'AWS::Lambda::Permission': {
    groupName: 'LambdaPermissions',
    counter: 0,
  },
  'AWS::Lambda' : {
    groupName: 'LambdaFunctions',
    counter: 0,
  },
  'AWS::Logs': {
    groupName: 'Logs',
    counter: 0,
  },
};

const maxGroupValue = 50;

module.exports = (resource, logicalId) => {
  for (const key of Object.keys(mapping)) {
    if (resource.Type.indexOf(key) !== -1) {
      let incrementer = 1;
      if (resource.Properties.RequestParameters) {
        incrementer += (Object.keys(resource.Properties.RequestParameters).length || 1);
      }

      mapping[key].counter += incrementer;
      return { destination: `${mapping[key].groupName}${mapping[key].counter / maxGroupValue | 0}` };
    }
  }

  // Falls back to default
};
