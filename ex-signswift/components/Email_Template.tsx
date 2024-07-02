import * as React from "react";

interface EmailTemplateProps {
  presignedUrltodownload: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  presignedUrltodownload,
}) => (
  <div>
    <h3>Your document is signed by all recipients</h3>{" "}
    <a href={presignedUrltodownload}>Link to Completed Document</a>
  </div>
);
