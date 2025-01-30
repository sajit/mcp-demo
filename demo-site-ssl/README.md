1.1 Create a Certificate Authority
openssl genpkey -algorithm RSA -out ca-key.pem
openssl req -new -x509 -key ca-key.pem -out ca-cert.pem -days 365

1.2 Generate a Server Certificate
openssl genpkey -algorithm RSA -out server-key.pem
openssl req -new -key server-key.pem -out server.csr 
openssl x509 -req -in server.csr -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem -days 365



