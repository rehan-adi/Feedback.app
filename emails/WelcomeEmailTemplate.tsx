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
  
  interface WelcomeEmailProps {
    username: string;
  }
  
  export default function WelcomeEmailTemplate({ username }: WelcomeEmailProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Welcome to Our Service</title>
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
        <Preview>Welcome to Our Service</Preview>
        <Section>
          <Row>
            <Heading as="h2">Welcome, {username}!</Heading>
          </Row>
          <Row>
            <Text>
              We're excited to have you on board. Thank you for joining us!
            </Text>
          </Row>
          <Row>
            <Text>
              If you have any questions or need assistance, feel free to reach out to our support team.
            </Text>
          </Row>
          <Row>
            <Text>
              Best regards,
              <br />
              The Team
            </Text>
          </Row>
        </Section>
      </Html>
    );
  }
  