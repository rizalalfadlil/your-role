import '../globals.css'
import { useRef, useState } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Info, LoaderCircle, Upload } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

// Fungsi untuk menghasilkan nilai acak berbasis Base64
const getRandomValuesFromImage = (base64String: any, divideBy: number) => {
  const part = splitStringIntoParts(base64String, divideBy);
  const partNumber = part.map((s) => getRandomIntFromString(s));

  console.log(getRandomIntFromString(base64String) % 2 == 0);

  const diffrentizedPartNumber = partNumber.map((s, i) => s + i);
  console.log(diffrentizedPartNumber);

  return diffrentizedPartNumber;
};

function getRandomIntFromString(str: string, min = 0, max = 1000) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const randomInt = (Math.abs(hash) % (max - min + 1)) + min;
  return randomInt;
}

function splitStringIntoParts(str: string, parts: number) {
  const result = [];
  const partSize = Math.floor(str.length / parts); // Ukuran bagian yang hampir rata
  let remainder = str.length % parts; // Sisa karakter yang akan ditambahkan ke bagian terakhir

  let start = 0;

  for (let i = 0; i < parts; i++) {
    let extraChar = remainder > 0 ? 1 : 0; // Tambahkan 1 karakter ekstra jika masih ada sisa
    result.push(str.slice(start, start + partSize + extraChar)); // Potong string
    start += partSize + extraChar; // Pindah ke bagian berikutnya
    remainder--; // Kurangi sisa karakter
  }

  return result;
}

// Komponen RadarChart
export function RadarComponent() {
  const [chartData, setChartData]: any = useState([]);
  const [fileUrl, setfileUrl] = useState("");
  const fileInputRef: any = useRef(null);
  const [name, setname] = useState("");
  const [loading, setloading] = useState(false);
  const [resultData, setResultData]: any = useState({});
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    setfileUrl(URL.createObjectURL(file));
    const reader = new FileReader();

    function triggerLoading() {
      setloading(true);
      setTimeout(() => {
        setloading(false);
      }, 2000);
    }
    reader.onloadend = () => {
      triggerLoading();
      const base64String = reader.result;
      // Dapatkan nilai acak dari gambar
      const values = getRandomValuesFromImage(base64String, 10);

      // Format data untuk chart
      const newChartData = [
        {
          category: "sepuh",
          value: values[0],
          text: [
            {
              img: "./meme/puh.jpeg",
              text: "puh sepuh dewa leluhur, aku kpn yh",
            },
            {
              img: "./meme/puh2.jpeg",
              text: "sepuh jago gambar/ngedit/fps/ritim/semuanya, aku kpn yh",
            },
          ],
        },
        {
          category: "caboel",
          value: values[1],
          text: [
            {
              img: "./meme/bul.jpeg",
              text: "orang komen caboel mulu ke gambar 2d sebaiknya jangan ditemenin ntar ketularan",
            },
            {
              img: "./meme/bul2.jpeg",
              text: "orang gak bisa nahan hawa nafsu sama karakter kartun",
            },
          ],
        },
        {
          category: "kroco",
          value: values[2],
          text: [
            {
              img: "./meme/co.jpeg",
              text: "orang kroco gak dikenal siapa siapa",
            },
            { img: "./meme/co2.jpeg", text: "siapa yh" },
          ],
        },
        {
          category: "jomok",
          value: values[3],
          text: [
            {
              img: "./meme/mok.jpeg",
              text: "jomok banget suka kirim stiker orang hitam semoga cepet sadar",
            },
            { img: "./meme/mok2.jpeg", text: "asdf asd" },
          ],
        },
        {
          category: "pedo",
          value: values[4],
          text: [
            { img: "./meme/pdf.jpeg", text: "bang sadar bang" },
            {
              img: "./meme/pdf.jpeg",
              text: "halo perlindungan anak indonesia",
            },
          ],
        },
        {
          category: "rasis",
          value: values[5],
          text: [
            { img: "./meme/rasis.jpeg", text: "saiba momoi" },
            { img: "./meme/rasis2.jpeg", text: "n-" },
          ],
        },
        {
          category: "chef",
          value: values[6],
          text: [
            {
              img: "./meme/chef.jpeg",
              text: "penggoreng handal gak pernah kelewat drama apapun",
            },
            {
              img: "./meme/chef2.jpeg",
              text: "setiap ada drama langsung gass goreng aja ygy gak peduli faktanya gimana",
            },
          ],
        },
        {
          category: "klemer",
          value: values[7],
          text: [
            { img: "./meme/klemer.jpeg", text: "yahaha waifunya musiman" },
            {
              img: "./meme/klemer2.jpeg",
              text: "bit banget apa apa di klem asw",
            },
          ],
        },
        {
          category: "artis",
          value: values[8],
          text: [
            {
              img: "./meme/tis.jpeg",
              text: "artis banget sejam posting langsung satu juta riek",
            },
            {
              img: "./meme/tis2.jpeg",
              text: "kpn yh bisa sejuta riek kayak artis ini",
            },
          ],
        },
        {
          category: "karbit",
          value: values[9],
          text: [
            { img: "./meme/bit.jpeg", text: "asdasd" },
            { img: "./meme/bit2.jpeg", text: "asdf asd" },
          ],
        },
      ];

      setChartData(newChartData);

      setResultData(() => {
        const top = sortChartDataByValue(newChartData)[0];
        console.log(top);
        return {
          category: top.category,
          text: getRandomElementFromArray(top.text).text,
          image: getRandomElementFromArray(top.text).img,
        };
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  };
  const triggerFileUpload = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  function sortChartDataByValue(chartData: any) {
    return chartData.sort(
      (a: { value: number }, b: { value: number }) => b.value - a.value
    );
  }

  function getRandomElementFromArray(arr: any[]) {
    const randomIndex = Math.floor(Math.random() * arr.length); // Pilih indeks acak
    console.log(randomIndex);
    return arr[randomIndex]; // Kembalikan elemen di indeks acak
  }

  function reset() {
    setChartData([]);
    setfileUrl("");
    setname("");
    setResultData({});
  }
  return (
    <div className="pt-4">
      <div
        className={`space-y-8 ${
          chartData.length > 0 && "grid sm:grid-cols-2 place-content-center"
        }`}
      >
        {chartData.length > 0 ? (
          <>
            <div className="space-y-4 grid place-content-center">
              <p className="text-lg font-bold uppercase">{name}</p>
              <div
                className="min-w-60 aspect-square bg-cover bg-center bg-no-repeat border rounded-md"
                style={{ backgroundImage: `url("${fileUrl}")` }}
              />
            </div>

            {loading ? (
              <div className="w-full h-full flex items-center justify-center gap-4 border-t-2 sm:border-t-0 sm:border-s-2">
                <LoaderCircle className="animate-spin" />
                <span>loading boongan</span>
              </div>
            ) : (
              <div className="grid justify-center w-full border-t-2 sm:border-t-0 sm:border-s-2">
                <ChartContainer config={chartConfig} className=" aspect-square">
                  <RadarChart data={chartData.slice(0, 9)} startAngle={45}>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <PolarAngleAxis dataKey="category" orientation="inner" />
                    <PolarGrid />
                    <Radar
                      name="score"
                      dataKey="value"
                      stroke="#1c5ad5"
                      fill="#1c5ad5"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ChartContainer>
                <div className="grid place-content-center text-center space-y-4 py-4 border-t-2">
                  <p>{name}</p>
                  <p className="font-bold text-lg">{resultData.category}</p>
                  <div
                    style={{ backgroundImage: `url("${resultData.image}")` }}
                    className="min-w-60 rounded-md bg-center bg-contain bg-no-repeat aspect-square"
                  />
                  <p>{resultData.text}</p>
                </div>
                <Button className="w-full mt-4" onClick={reset}>
                  kembali
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4 grid content-center w-full">
            <p className="text-2xl capitalize font-bold">
              apa role kamu di facebook
            </p>
            <div className="space-y-2">
              <label>nama/username kamu</label>
              <Input
                className=" transition-all"
                value={name}
                placeholder="masukkan nama"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <input
              className="hidden"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label>foto kamu</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Info size={16} />
                  </PopoverTrigger>
                  <PopoverContent
                    side="left"
                    className="w-60 sm:max-w-screen-sm"
                  >
                    <p>
                      kalo gak mau pake foto asli pake foto profil aja ga
                      apa-apa sih. foto cuma di pake di sisi klien & gak akan di
                      upload
                    </p>
                  </PopoverContent>
                </Popover>
              </div>

              <Button
                disabled={name === ""}
                onClick={triggerFileUpload}
                className=" w-full"
                variant="secondary"
              >
                <Upload />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
