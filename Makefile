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

deploy-ec2-part-1:
	(npm run build && npm run deploy-ec2-part-1-demo)

destroy-ec2-part-1:
	(npm run build && npm run destroy-ec2-part-1-demo)
