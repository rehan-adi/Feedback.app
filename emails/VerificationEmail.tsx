import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  verifyCode: string;
}

export default function VerificationEmail({ username, verifyCode }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Email Verification</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Verify your email address</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {username},</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering. Please use the following code to verify your email address:
          </Text>
        </Row>
        <Row>
          <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Your Verification Code: {verifyCode}
          </Text>
        </Row>
        <Row>
          <Text>
            If you did not request this verification, please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
