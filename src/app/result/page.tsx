"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";

const ResultPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isParent = searchParams.get("isParent") === "true";
  const selectedYaku = searchParams.get("selectedYaku");
  const fu = parseInt(searchParams.get("fu") || "0", 10);

  const [score, setScore] = useState<number | null>(null);
  const [description, setDescription] = useState<string>("");

  // 点数計算ロジック
  useEffect(() => {
    if (!selectedYaku || fu === null || fu === undefined) return;
    let baseScore = 0;
    let description = "";

    if (selectedYaku === "1役") {
      // 1役の場合の計算
      if (isParent) {
        if (fu === 70) {
          baseScore = 3400;
          description = "1200オール";
        } else if (fu === 60) {
          baseScore = 2900;
          description = "1000オール";
        } else if (fu === 50) {
          baseScore = Math.ceil(1600 * 1.5);
          const allPoints = baseScore / 3;
          description = `${allPoints}オール`;
        } else if (fu === 40) {
          baseScore = 2000;
          description = "700オール";
        } else if (fu === 30) {
          baseScore = Math.ceil(1000 * 1.5);
          const allPoints = baseScore / 3;
          description = `${allPoints}オール`;
        }
      } else {
        if (fu === 70) {
          baseScore = 2300;
          description = "親：1200 子：600";
        } else if (fu === 60) {
          baseScore = 2000;
          description = "親：1000 子：500";
        } else if (fu === 50) {
          baseScore = 1600;
          description = "親：800 子：400";
        } else if (fu === 40) {
          baseScore = 1300;
          description = "親：700 子：400";
        } else if (fu === 30) {
          baseScore = 1000;
          description = "親：500 子：300";
        }
      }
    } else if (selectedYaku === "2役") {
      // 2役の場合の計算
      if (isParent) {
        if (fu === 70) {
          baseScore = 6800;
          description = "2300オール";
        } else if (fu === 60) {
          baseScore = 5800;
          description = "2000オール";
        } else if (fu === 50) {
          baseScore = Math.ceil(3200 * 1.5);
          const allPoints = baseScore / 3;
          description = `${allPoints}オール`;
        } else if (fu === 40) {
          baseScore = Math.ceil(2600 * 1.5);
          const allPoints = baseScore / 3;
          description = `${allPoints}オール`;
        } else if (fu === 30) {
          baseScore = 2900;
          description = "1000オール";
        } else if (fu === 25) {
          baseScore = Math.ceil(1600 * 1.5);
          const allPoints = baseScore / 3;
          description = `${allPoints}オール`;
        } else if (fu === 20) {
          baseScore = 2100;
          const allPoints = baseScore / 3;
          description = `${allPoints}オール`;
        }
      } else {
        if (fu === 70) {
          baseScore = 4500;
          description = "親：2300 子：1200";
        } else if (fu === 60) {
          baseScore = 3900;
          description = "親：2000 子：1000";
        } else if (fu === 50) {
          baseScore = 3200;
          description = "1600 子：800";
        } else if (fu === 40) {
          baseScore = 2600;
          description = "親：1300 子：700";
        } else if (fu === 30) {
          baseScore = 2000;
          description = "親：1000 子：500";
        } else if (fu === 25) {
          baseScore = 1600;
          description = "親：800 子：400";
        } else if (fu === 20) {
          baseScore = 1500;
          description = "親：700 子：400";
        }
      }
    } else if (selectedYaku === "3役") {
      // 3役の場合の計算
      if (isParent) {
        if (fu >= 60) {
          baseScore = Math.ceil(8000 * 1.5);
          const allPoints = baseScore / 3;
          description = `${allPoints}オール`;
        } else if (fu === 50) {
          baseScore = Math.ceil(6400 * 1.5);
          const allPoints = baseScore / 3;
          description = `${allPoints}オール`;
        } else if (fu === 40) {
          baseScore = Math.ceil(5200 * 1.5);
          const allPoints = baseScore / 3;
          description = `${allPoints}オール`;
        } else if (fu === 25) {
          baseScore = Math.ceil(3200 * 1.5);
          const allPoints = baseScore / 3;
          description = `${allPoints}オール`;
        } else if (fu === 30) {
          baseScore = 5800;
          description = "2000オール";
        } else if (fu === 20) {
          baseScore = 3900;
          description = "1300オール";
        }
      } else {
        if (fu >= 60) {
          baseScore = 8000;
          description = "親：4000 子：2000";
        } else if (fu === 50) {
          baseScore = 6400;
          description = "親：3200 子：1600";
        } else if (fu === 40) {
          baseScore = 5200;
          description = "親：2600 子：1300";
        } else if (fu === 30) {
          baseScore = 3900;
          description = "親：2000 子：1000";
        } else if (fu === 25) {
          baseScore = 3200;
          description = "親：1600 子：800";
        } else if (fu === 20) {
          baseScore = 2700;
          description = "親：1300 子：700";
        }
      }
    } else if (selectedYaku === "4役") {
      // 4役の場合の計算
      if (isParent) {
        if (fu >= 30) {
          baseScore = Math.ceil(8000 * 1.5);
          const allPoints = baseScore / 3;
          description = `${allPoints}オール`;
        } else if (fu === 25) {
          baseScore = Math.ceil(6400 * 1.5);
          const allPoints = baseScore / 3;
          description = `${allPoints}オール`;
        } else if (fu === 20) {
          baseScore = Math.ceil(5200 * 1.5);
          const allPoints = baseScore / 3;
          description = `${allPoints}オール`;
        }
      } else {
        if (fu >= 30) {
          baseScore = 8000;
          const childPoints = Math.floor(baseScore / 4);
          const parentPoints = childPoints * 2;
          description = `親：${parentPoints} 子：${childPoints}`;
        } else if (fu === 25) {
          baseScore = 6400;
          const childPoints = Math.floor(baseScore / 4);
          const parentPoints = childPoints * 2;
          description = `親：${parentPoints} 子：${childPoints}`;
        } else if (fu === 20) {
          baseScore = 5200;
          const childPoints = Math.floor(baseScore / 4);
          const parentPoints = childPoints * 2;
          description = `親：${parentPoints} 子：${childPoints}`;
        }
      }
    } else if (
      ["5役", "6~7役", "8~10役", "11~12役", "13役以上"].includes(selectedYaku)
    ) {
      // 5役以上の計算
      switch (selectedYaku) {
        case "5役":
          baseScore = 8000;
          break;
        case "6~7役":
          baseScore = 12000;
          break;
        case "8~10役":
          baseScore = 16000;
          break;
        case "11~12役":
          baseScore = 24000;
          break;
        case "13役以上":
          baseScore = 32000;
          break;
      }
      if (isParent) {
        baseScore = Math.ceil(baseScore * 1.5);
        description = `${baseScore / 3}オール`;
      } else {
        description = `親：${baseScore / 2} 子：${baseScore / 4}`;
      }
    }

    setDescription(description);
    setScore(baseScore);
  }, [isParent, selectedYaku, fu]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #3b82f6, #9333ea)",
        color: "#ffffff",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          marginBottom: 4,
          animation: "fadeIn 1s ease-out",
        }}
      >
        結果
      </Typography>
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "12px",
          padding: "20px",
          textAlign: "center",
          animation: "fadeIn 1.5s ease-out",
          width: "80%",
          maxWidth: "500px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            color: "#ffd700",
            fontSize: "2rem",
          }}
        >
          {score !== null ? `${score}点` : "計算中..."}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            marginTop: 1,
            color: "#ffffff",
            fontSize: "1rem",
          }}
        >
          ツモの場合（{description}）
        </Typography>
      </Box>

      <Button
        variant="contained"
        onClick={() => router.push("/")}
        sx={{
          background: "linear-gradient(135deg, #6a11cb, #2575fc)",
          color: "#ffffff",
          paddingX: 4,
          paddingY: 2,
          fontSize: "1.25rem",
          fontWeight: "bold",
          borderRadius: "50px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          textTransform: "none",
          marginTop: "30px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)",
            boxShadow: "0 6px 25px rgba(0, 0, 0, 0.3)",
            background: "linear-gradient(135deg, #5b0e99, #1b69c5)",
          },
        }}
      >
        再スタート
      </Button>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};

export default ResultPage;
