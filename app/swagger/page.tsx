import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css'; 

const SwaggerPage = () => {
  return (
    <div style={{ height: '100vh' }}>
      <SwaggerUI url="/api/docs" />
    </div>
  );
};

export default SwaggerPage;