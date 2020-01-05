prepare:
	rm -f artifacts/s3/*.zip
	(cd artifacts/s3/public/ && zip -r ../public.zip ./)
	(cd artifacts/s3/private/ && zip -r ../private.zip ./)
	rm -f dynamic-artifacts/ec2-part-1/*.zip
	(cd dynamic-artifacts/ec2-part-1/ && zip -r dist.zip ./app.jar)

deploy-s3:
	(npm run build && npm run deploy-s3-demo)
destroy-s3:
	(npm run build && npm run destroy-s3-demo)

deploy-ec2:
	(npm run build && npm run deploy-ec2-demo)
destroy-ec2:
	(npm run build && npm run destroy-ec2-demo)

deploy-fargate:
	(npm run build && npm run deploy-fargate-demo)
destroy-fargate:
	(npm run build && npm run destroy-fargate-demo)

deploy-lambda:
	(npm run build && npm run deploy-lambda-demo)
destroy-lambda:
	(npm run build && npm run destroy-lambda-demo)

deploy-apigateway:
	(npm run build && npm run deploy-apigateway-demo)
destroy-apigateway:
	(npm run build && npm run destroy-apigateway-demo)

deploy-sqs:
	(npm run build && npm run deploy-sqs-demo)
destroy-sqs:
	(npm run build && npm run destroy-sqs-demo)
