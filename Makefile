run:
	nx run-many --parallel 100 --target=serve --projects=api-gateway,auth
reset:
	nx reset
gen:
	protoc --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb -I='./libs/shared/src/proto' './libs/shared/src/proto/auth.proto' --ts_proto_out=./libs/shared/src/proto/gen/
