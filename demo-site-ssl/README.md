# 1.1 Create a Certificate Authority
openssl genpkey -algorithm RSA -out ca-key.pem

openssl req -new -x509 -key ca-key.pem -out ca-cert.pem -days 365


# 1.2 Generate a Server Certificate
openssl genpkey -algorithm RSA -out server-key.pem

openssl req -new -key server-key.pem -out server.csr 

openssl x509 -req -in server.csr -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem -days 365


# 1.3 Generate client Certificate
openssl genpkey -algorithm RSA -out client-key.pem

openssl req -new -key client-key.pem -out client.csr 

openssl x509 -req -in client.csr -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out client-cert.pem -days 365


# 1.4 Export client certificate to browser
openssl pkcs12 -export -inkey client-key.pem -in client-cert.pem -certfile ca-cert.pem -out client.p12



