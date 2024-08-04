import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

export const EmailTemplate = ({
  response,
}) => (
  <Html>
    <Head />
    <Preview>Yelp recent login</Preview>
    <Body style={main}>
      <Container>
        <Section style={logo}>
          <Img src="/logo.svg" />
        </Section>

        <Section style={content}>
          <Row>
            <Img
              style={image}
              width={620}
              src="https://firebasestorage.googleapis.com/v0/b/fluxfile-2a21b.appspot.com/o/file%2Ffluxfile-header.JPG?alt=media&token=89d26f39-a41a-4313-af15-5d3a9c53a107"
            />
          </Row>

          <Row style={{ ...boxInfos, paddingBottom: "0" }}>
            <Column>
              <Heading
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Hi {response.emailToSend.split('@')[0]},
              </Heading>
              <Heading
                as="h2"
                style={{
                  fontSize: 26,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Someone Share file with you.
              </Heading>

              <Text style={paragraph}>
                <b>File Name: </b> {response.fileName}
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                <b>File Size: </b> {response.fileSize}
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                <b>File Type: </b> {response.fileType}
              </Text>
              <Text
                style={{
                  color: "rgb(0,0,0, 0.5)",
                  fontSize: 14,
                  marginTop: -5,
                }}
              >
                *Access and Download file on your own risk.
              </Text>

              <Text style={paragraph}>
                You can also share files with fluxfile.
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                Click below Button to access your files.
              </Text>
            </Column>
          </Row>

          <Row style={{ ...boxInfos, paddingTop: "0" }}>
            <Column style={containerButton} colSpan={2}>
              <Button
                style={button}
                href={response?.shortUrl}
              >Click here to Download</Button>
            </Column>
          </Row>
        </Section>

        <Section style={containerImageFooter}>
          <Img
            style={image}
            width={620}
            src="https://example.com/static/yelp-footer.png"
          />
        </Section>

        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "rgb(0,0,0, 0.7)",
          }}
        >
          © 2024 | FluxFiles @2024, Mohalla Hayakhel Hazarkhwani, Peshawar.
          PK | www.FluxFiles.com
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
