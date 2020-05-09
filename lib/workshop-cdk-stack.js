const cdk = require('@aws-cdk/core');
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";

class WorkshopCdkStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, "restaurants-api", {
      restApiName: "Widget Service",
      description: "This service serves widgets."
    });

    /**
     * @path /
     * @http GET
     */
    const getIndex = new lambda.Function(this, "getIndex", {
      runtime: lambda.Runtime.NODEJS_10_X, // So we can use async in handler
      code: lambda.Code.asset("functions"),
      handler: "get-index.handler",
    });

    const getIndexIntegration = new apigateway.LambdaIntegration(getIndex);
    
    api.root.addMethod('GET', getIndexIntegration);

    /**
     * @path /rerstaurants
     * http GET
     */
    const getRestaurants = new lambda.Function(this, "getRestaurants", {
      runtime: lambda.Runtime.NODEJS_10_X, // So we can use async in handler
      code: lambda.Code.asset("functions"),
      handler: "get-restaurants.handler",
    });

    const getRrestaurantsIntegration = new apigateway.LambdaIntegration(getRestaurants);

    const restaurants = api.root.addResource('restaurants');
    restaurants.addMethod('GET', getRrestaurantsIntegration);

    /**
     * @path /restaurants/search
     * @http GET
     */
    const searchRestaurants = new lambda.Function(this, "searchRestaurants", {
      runtime: lambda.Runtime.NODEJS_10_X, // So we can use async in handler
      code: lambda.Code.asset("functions"),
      handler: "search-restaurants.handler",
    });

    const searchRrestaurantsIntegration = new apigateway.LambdaIntegration(searchRestaurants);

    const search = restaurants.addResource('search');
    search.addMethod('GET', searchRrestaurantsIntegration);
  }
}

module.exports = { WorkshopCdkStack }
