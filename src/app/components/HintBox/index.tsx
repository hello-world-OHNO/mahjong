import React, { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface HintBoxProps {
  text: ReactNode; // ReactNode を使用してタグを受け取れるように変更
}

const HintBox: React.FC<HintBoxProps> = ({ text }) => {
  return (
    <Box
      sx={{
        marginTop: 4,
        padding: 2,
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: "8px",
        textAlign: "left",
        maxWidth: "400px",
        opacity: 0,
        animation: "fadeIn 3s ease-out",
        animationDelay: "1s",
        animationFillMode: "forwards",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          marginBottom: 1,
          color: "#ffd700",
        }}
      >
        💡ヒント：
      </Typography>
      <Typography
        variant="body1"
        sx={{
          lineHeight: 1.5,
        }}
      >
        {text} {/* 外部からタグ付きの内容を渡せる */}
      </Typography>
    </Box>
  );
};

export default HintBox;
