import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

import {
  Activity as ActivityIcon,
  FileText,
  Download,
  Briefcase,
  Calendar,
} from "lucide-react";

type CVItem = {
  id: string;
  titulo: string;
  updatedAt: string;
  desc: string;
};

type ActivityItem = {
  id: string;
  fecha: string;
  evento: string;
  detalle: string;
  icon?: React.ReactNode;
};

const cvs: CVItem[] = [
  {
    id: "cv-01",
    titulo: "CV — Senior Web3 Dev",
    updatedAt: "Actualizado hoy",
    desc: "Enfocado en Solidity, Foundry y auditorías de contratos.",
  },
  {
    id: "cv-02",
    titulo: "CV — Full-Stack React",
    updatedAt: "Actualizado hace 3 días",
    desc: "React, Next.js, UI System y performance.",
  },
  {
    id: "cv-03",
    titulo: "CV — Product Engineer",
    updatedAt: "Actualizado hace 2 semanas",
    desc: "Entrega end-to-end, UX y data-informed features.",
  },
];

const actividad: ActivityItem[] = [
  {
    id: "a-01",
    fecha: "Hoy • 10:21",
    evento: "Aplicación enviada",
    detalle: "UX Product Designer — ETHGlobal",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    id: "a-02",
    fecha: "Ayer • 18:02",
    evento: "Entrevista agendada",
    detalle: "Creator DAO — React Native",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: "a-03",
    fecha: "Hace 3 días",
    evento: "CV actualizado",
    detalle: "CV — Senior Web3 Dev",
    icon: <FileText className="h-4 w-4" />,
  },
];

export default function Profile() {
  const navigate = useNavigate();

  const stats = {
    cvsCreados: cvs.length,
    aplicaciones: 12,
    entrevistas: 4,
  };

  return (

    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Card className="glass border-white/10 dark:border-none p-6 mb-6 bg-white dark:bg-[#0b0b0b]">
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent p-1">
              <div className="h-full w-full rounded-full bg-card flex items-center justify-center text-3xl font-bold">
                JD
              </div>
            </div>

            <div className="flex-1 text-gray-900 dark:text-white">
              <h1 className="text-3xl font-bold mb-2">John Doe</h1>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Web3 Developer & Blockchain Architect
              </p>

              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-primary/20 dark:bg-primary/70 text-sm">Solidity</span>
                <span className="px-3 py-1 rounded-full bg-accent/20 dark:bg-primary/70 text-sm">React</span>
                <span className="px-3 py-1 rounded-full bg-primary/20 dark:bg-primary/70 text-sm">Smart Contracts</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Métricos rápidos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 ">
          <Card className="bg-white dark:bg-[#0b0b0b] text-gray-900 dark:text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">CV creados</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-3xl font-semibold">{stats.cvsCreados}</div>
              <FileText className="h-6 w-6 opacity-70" />
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#0b0b0b] text-gray-900 dark:text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Aplicaciones</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-3xl font-semibold">{stats.aplicaciones}</div>
              <Briefcase className="h-6 w-6 opacity-70" />
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#0b0b0b] text-gray-900 dark:text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Entrevistas</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-3xl font-semibold">{stats.entrevistas}</div>
              <ActivityIcon className="h-6 w-6 opacity-70" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white dark:bg-[#0b0b0b] text-gray-900 dark:text-white">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">CVs creados</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  className="px-3 py-1 rounded-full bg-primary/20 dark:bg-primary/70 text-sm"
                  onClick={() => navigate("/create-cv")}
                >
                  Nuevo CV
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {cvs.map((cv) => (
                <div
                  key={cv.id}
                  className="rounded-xl border p-4 hover:bg-muted/30 transitio"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{cv.titulo}</h3>
                        <Badge variant="secondary" className="rounded-full bg-primary/40 dark:bg-primary/70 dark:text-white">
                          {cv.updatedAt}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {cv.desc}
                      </p>
                    </div>
                    <Button size="sm" className="rounded-xl" variant="secondary">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar PDF
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#0b0b0b] text-gray-900 dark:text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Actividad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {actividad.map((item, idx) => (
                <div key={item.id}>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{item.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.evento}</p>
                      <p className="text-sm text-muted-foreground">{item.detalle}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.fecha}</p>
                    </div>
                  </div>
                  {idx < actividad.length - 1 && <Separator className="my-3" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}