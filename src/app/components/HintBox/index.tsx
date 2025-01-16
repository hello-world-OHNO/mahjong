import React from "react";
import { Box, Typography } from "@mui/material";

interface HintBoxProps {
  text: string;
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
        opacity: 0, // 初期状態で非表示
        animation: "fadeIn 3s ease-out",
        animationDelay: "1s", // 2秒間の遅延を設定
        animationFillMode: "forwards", // アニメーション終了後に最終状態を保持
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
        {text}
      </Typography>
    </Box>
  );
};

export default HintBox;
