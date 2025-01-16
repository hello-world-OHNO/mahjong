"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import HintBox from "./components/HintBox";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const [stage, setStage] = useState<
    | "start"
    | "question"
    | "tsumoQuestion"
    | "yakuQuestion"
    | "nakuQuestion"
    | "additionalQuestion"
    | "kanQuestion"
  >("start");

  const handleStartClick = () => {
    setStage("question");
  };

  const [fu, setFu] = useState<number | null>(null); // 符の管理
  const [isParent, setIsParent] = useState<boolean | null>(null); // 親子の管理
  const handleRoleSelect = (role: "親" | "子") => {
    const isSelectedParent = role === "親";
    setIsParent(isSelectedParent);
    console.log(`選択した役割: ${isSelectedParent ? "親" : "子"}`);
    setStage("tsumoQuestion");
  };

  const [tsumoOrRon, setTsumoOrRon] = useState<"ツモ" | "ロン" | null>(null); // ツモまたはロンを管理するフラグ
  const handleTsumoOrRon = (type: "ツモ" | "ロン") => {
    setTsumoOrRon(type);
    console.log(tsumoOrRon);
    setStage("yakuQuestion");
  };

  const [selectedYaku, setSelectedYaku] = useState<string | null>(null); // 選択された役数を管理
  const handleYakuSelect = (label: string) => {
    setSelectedYaku(label); // 選択した役数を保存
    if (
      label === "5役" ||
      label === "6~7役" ||
      label === "8~10役" ||
      label === "11~12役" ||
      label === "13役以上"
    ) {
      console.log(`選択した役数: ${label}, 親: ${isParent}`);
      const queryString = new URLSearchParams({
        fu: "0",
        isParent: isParent ? "true" : "false",
        selectedYaku: label,
      }).toString();

      // クエリを使って遷移
      router.push(`/result?${queryString}`);
    } else {
      console.log(`${label} が選択されました`);
      setStage("nakuQuestion");
    }
  };

  const [nakuAnswer, setNakuAnswer] = useState<"はい" | "いいえ" | null>(null);
  const handleNakuSelect = (answer: "はい" | "いいえ") => {
    console.log(nakuAnswer);
    setNakuAnswer(answer); // 鳴きの回答をステートに保存
    setStage("additionalQuestion");
  };

  const [kanSelections, setKanSelections] = useState<Record<string, number>>( // カンの加算
    {}
  );
  // デバッグ用
  useEffect(() => {
    console.log("符の値:", fu);
  }, [fu]);

  const handleKanSelection = (type: string) => {
    if (Object.values(kanSelections).reduce((a, b) => a + b, 0) < 3) {
      setKanSelections((prev) => {
        const updatedSelections = {
          ...prev,
          [type]: (prev[type] || 0) + 1,
        };
        // 符の加算処理
        switch (type) {
          case "暗カン（１・９・字牌）":
            setFu((prevFu) =>
              prevFu !== null && prevFu !== undefined ? prevFu + 30 : 30
            );
            break;
          case "暗カン（１・９・字牌 以外）":
            setFu((prevFu) =>
              prevFu !== null && prevFu !== undefined ? prevFu + 20 : 20
            );
            break;
          case "明カン（１・９・字牌）":
            setFu((prevFu) =>
              prevFu !== null && prevFu !== undefined ? prevFu + 20 : 20
            );
            break;
          case "明カン（１・９・字牌 以外）":
            setFu((prevFu) =>
              prevFu !== null && prevFu !== undefined ? prevFu + 10 : 10
            );
            break;
        }
        return updatedSelections;
      });
    } else {
      alert("最大3回までしか選択できません");
    }
  };

  const handleAdditionalSelect = (label: string) => {
    if (label === "対々和" || label === "三暗刻") {
      setFu(40); // 対々和・三暗刻は符40
      router.push(
        `/result?isParent=${isParent}&selectedYaku=${selectedYaku}&fu=${40}`
      );
    } else if (label === "七対子") {
      setFu(25); // 七対子は符25
      console.log(
        `/result?isParent=${isParent}&selectedYaku=${selectedYaku}&fu=${fu}`
      );
      router.push(
        `/result?isParent=${isParent}&selectedYaku=${selectedYaku}&fu=${25}`
      );
    } else if (label === "平和") {
      const fuValue = tsumoOrRon === "ツモ" ? 20 : 30; // ツモなら符20、ロンなら符30
      setFu(fuValue);
      router.push(
        `/result?isParent=${isParent}&selectedYaku=${selectedYaku}&fu=${fuValue}`
      );
    } else if (label === "該当なし") {
      if (nakuAnswer === "はい") {
        setFu(30); // 鳴いている場合は符30
      } else {
        const fuValue = tsumoOrRon === "ツモ" ? 30 : 40; // ツモなら符30、ロンなら符40
        setFu(fuValue);
      }
      setStage("kanQuestion");
    }
  };

  // デバッグ用
  // console.log("役：", selectedYaku);
  // console.log("符：", fu);

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
      {stage === "start" && (
        <>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
              letterSpacing: "0.1em",
              textShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
              animation: "fadeIn 1s ease-out",
            }}
          >
            麻雀点数計算（α版）
          </Typography>
          <Button
            variant="contained"
            onClick={handleStartClick}
            sx={{
              background: "linear-gradient(135deg, #ffd700, #ff8c00)",
              color: "#333333",
              paddingX: 4,
              paddingY: 2,
              fontSize: "1.25rem",
              fontWeight: "bold",
              borderRadius: "50px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              textTransform: "none",
              marginTop: "20px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0 6px 25px rgba(0, 0, 0, 0.3)",
              },
              animation: "fadeIn 2s ease-out",
            }}
          >
            START
          </Button>
        </>
      )}

      {stage === "question" && (
        <>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: 4,
              animation: "fadeIn 1s ease-out",
            }}
          >
            あなたは親ですか？
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              animation: "fadeIn 1.5s ease-out",
            }}
          >
            <Button
              variant="contained"
              onClick={() => handleRoleSelect("親")}
              sx={{
                width: "200px",
                height: "60px",
                background: "linear-gradient(135deg, #6a85f5, #818cf8)",
                color: "#ffffff",
                fontSize: "1.25rem",
                fontWeight: "bold",
                borderRadius: "10px",
                textTransform: "none",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
                  background: "linear-gradient(135deg, #5a73f5, #6f80f8)",
                },
              }}
            >
              親
            </Button>
            <Button
              variant="contained"
              onClick={() => handleRoleSelect("子")}
              sx={{
                width: "200px",
                height: "60px",
                background: "linear-gradient(135deg, #f5866a, #f88381)",
                color: "#ffffff",
                fontSize: "1.25rem",
                fontWeight: "bold",
                borderRadius: "10px",
                textTransform: "none",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
                  background: "linear-gradient(135deg, #f5745a, #f86a7a)",
                },
              }}
            >
              子
            </Button>
          </Box>
          {/* 💡ヒント */}
          <HintBox text="東家を「親」、それ以外を「子」と呼びます。" />
        </>
      )}

      {stage === "tsumoQuestion" && (
        <>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: 4,
              animation: "fadeIn 1s ease-out",
            }}
          >
            ツモですか？ロンですか？
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              animation: "fadeIn 1.5s ease-out",
            }}
          >
            <Button
              variant="contained"
              onClick={() => handleTsumoOrRon("ツモ")}
              sx={{
                width: "200px",
                height: "60px",
                background: "linear-gradient(135deg, #6a85f5, #818cf8)",
                color: "#ffffff",
                fontSize: "1.25rem",
                fontWeight: "bold",
                borderRadius: "10px",
                textTransform: "none",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
                  background: "linear-gradient(135deg, #5a73f5, #6f80f8)",
                },
              }}
            >
              ツモ
            </Button>
            <Button
              variant="contained"
              onClick={() => handleTsumoOrRon("ロン")}
              sx={{
                width: "200px",
                height: "60px",
                background: "linear-gradient(135deg, #f5866a, #f88381)",
                color: "#ffffff",
                fontSize: "1.25rem",
                fontWeight: "bold",
                borderRadius: "10px",
                textTransform: "none",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
                  background: "linear-gradient(135deg, #f5745a, #f86a7a)",
                },
              }}
            >
              ロン
            </Button>
          </Box>
          {/* 💡ヒント */}
          <HintBox text="あがり牌を自分で引いたら「ツモ」他家から出たら「ロン」です。" />
        </>
      )}

      {stage === "yakuQuestion" && (
        <>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: 4,
              animation: "fadeIn 1s ease-out",
            }}
          >
            アガリ役は合計何役ですか？
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              animation: "fadeIn 1.5s ease-out",
            }}
          >
            {[
              "1役",
              "2役",
              "3役",
              "4役",
              "5役",
              "6~7役",
              "8~10役",
              "11~12役",
              "13役以上",
            ].map((label) => (
              <Button
                key={label}
                variant="contained"
                onClick={() => handleYakuSelect(label)}
                sx={{
                  height: "50px",
                  background: "linear-gradient(135deg, #ffd700, #ff8c00)",
                  color: "#333333",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #ffc107, #ffa100)",
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
          {/* 現在の選択を表示 */}
          {selectedYaku && (
            <Typography
              sx={{
                marginTop: 2,
                color: "#ffd700",
                fontWeight: "bold",
                animation: "fadeIn 0.5s ease-out",
              }}
            >
              現在の選択: {selectedYaku}
            </Typography>
          )}
        </>
      )}

      {stage === "nakuQuestion" && (
        <>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: 4,
              animation: "fadeIn 1s ease-out",
            }}
          >
            鳴いていますか？（ポン or チー）
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              animation: "fadeIn 1.5s ease-out",
            }}
          >
            {["はい", "いいえ"].map((label) => (
              <Button
                key={label}
                variant="contained"
                onClick={() => handleNakuSelect(label as "はい" | "いいえ")}
                sx={{
                  width: "200px",
                  height: "60px",
                  background:
                    label === "はい"
                      ? "linear-gradient(135deg, #6a85f5, #818cf8)" // 親の色
                      : "linear-gradient(135deg, #f5866a, #f88381)", // 子の色
                  color: "#ffffff",
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  textTransform: "none",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </>
      )}

      {stage === "additionalQuestion" && (
        <>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: 4,
              animation: "fadeIn 1s ease-out",
            }}
          >
            上がった役に以下の役は含まれますか？
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              animation: "fadeIn 1.5s ease-out",
            }}
          >
            {[
              {
                label: nakuAnswer === "はい" ? "対々和" : "七対子",
                color: "linear-gradient(135deg, #6a85f5, #818cf8)", // 親の色
                hoverColor: "linear-gradient(135deg, #5a73f5, #6f80f8)", // 親のホバー色
                action: () =>
                  handleAdditionalSelect(
                    nakuAnswer === "はい" ? "対々和" : "七対子"
                  ),
              },
              {
                label: nakuAnswer === "はい" ? "三暗刻" : "平和",
                color: "linear-gradient(135deg, #f5866a, #f88381)", // 子の色
                hoverColor: "linear-gradient(135deg, #f5745a, #f86a7a)", // 子のホバー色
                action: () =>
                  handleAdditionalSelect(
                    nakuAnswer === "はい" ? "三暗刻" : "平和"
                  ),
              },
              {
                label: "該当なし",
                color: "linear-gradient(135deg, #d1d5db, #9ca3af)", // グレー系
                hoverColor: "linear-gradient(135deg, #cbd5e1, #6b7280)", // グレー系ホバー色
                action: () => handleAdditionalSelect("該当なし"),
              },
            ].map(({ label, color, hoverColor, action }) => (
              <Button
                key={label}
                variant="contained"
                onClick={action}
                sx={{
                  width: "200px",
                  height: "60px",
                  background: color,
                  color: "#ffffff",
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  textTransform: "none",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
                    background: hoverColor,
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </>
      )}

      {stage === "kanQuestion" && (
        <>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: 4,
              animation: "fadeIn 1s ease-out",
            }}
          >
            カンしていますか？（最大3回まで選択可能）
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
              animation: "fadeIn 1.5s ease-out",
            }}
          >
            {[
              {
                label: "暗カン（１・９・字牌）",
                color: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                hoverColor: "linear-gradient(135deg, #fcd34d, #fbbf24)",
                action: () => handleKanSelection("暗カン（１・９・字牌）"),
              },
              {
                label: "暗カン（１・９・字牌 以外）",
                color: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                hoverColor: "linear-gradient(135deg, #fcd34d, #fbbf24)",
                action: () => handleKanSelection("暗カン（１・９・字牌 以外）"),
              },
              {
                label: "明カン（１・９・字牌）",
                color: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                hoverColor: "linear-gradient(135deg, #fcd34d, #fbbf24)",
                action: () => handleKanSelection("明カン（１・９・字牌）"),
              },
              {
                label: "明カン（１・９・字牌 以外）",
                color: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                hoverColor: "linear-gradient(135deg, #fcd34d, #fbbf24)",
                action: () => handleKanSelection("明カン（１・９・字牌 以外）"),
              },
              {
                label: "カンしていない",
                color: "linear-gradient(135deg, #d1d5db, #9ca3af)",
                hoverColor: "linear-gradient(135deg, #cbd5e1, #6b7280)",
                action: () => {
                  const fuValue = fu || 0;
                  const queryString = new URLSearchParams({
                    isParent: isParent ? "true" : "false",
                    selectedYaku: selectedYaku || "",
                    fu: fuValue.toString(),
                  }).toString();

                  router.push(`/result?${queryString}`);
                },
              },
            ].map(({ label, color, hoverColor, action }) => (
              <Button
                key={label}
                variant="contained"
                onClick={action}
                sx={{
                  width: "300px",
                  height: "60px",
                  background: color,
                  color: "#ffffff",
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  textTransform: "none",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
                    background: hoverColor,
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
          <Box sx={{ marginTop: 4, textAlign: "center" }}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "#ffd700" }}
              >
                合計選択数:{" "}
                {Object.values(kanSelections).reduce((a, b) => a + b, 0)} / 3
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  setKanSelections({});
                  setFu(0); // 符をリセット
                }}
                sx={{
                  marginTop: 2,
                  marginLeft: 2,
                  borderColor: "#ffffff",
                  color: "#ffffff",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  textTransform: "none",
                  paddingX: 3,
                  paddingY: 1,
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                カウントリセット
              </Button>
            </Box>
            <Button
              variant="contained"
              onClick={() => {
                const fuValue = fu || 0; // 現在の符を取得
                const queryString = new URLSearchParams({
                  isParent: isParent ? "true" : "false",
                  selectedYaku: selectedYaku || "",
                  fu: fuValue.toString(),
                }).toString();

                router.push(`/result?${queryString}`);
              }}
              sx={{
                marginTop: 4,
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                color: "#ffffff",
                fontSize: "1.25rem",
                fontWeight: "bold",
                borderRadius: "10px",
                textTransform: "none",
                paddingX: 4,
                paddingY: 1.5,
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #16a34a, #15803d)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              計算する
            </Button>
          </Box>
        </>
      )}

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

export default HomePage;
