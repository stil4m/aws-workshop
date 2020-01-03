prepare:
	rm artifacts/s3/*.zip
	(cd artifacts/s3/public/ && zip -r ../public.zip ./)
	(cd artifacts/s3/private/ && zip -r ../private.zip ./)

deploy-s3:
	(npm run build && npm run deploy-s3-demo)
