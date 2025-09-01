import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Loading } from "../components/ui/loading";
import { useCreateAttachment } from "../lib/hooks/use-create-attachment";
import { attachmentSchema, type AttachmentFormData } from "../lib/schemas";
import {
  DocumentType,
  gdeTypeLabels,
  documentTypeLabels,
} from "../lib/types";

export function NewAttachmentPage() {
  const navigate = useNavigate();
  const { createAttachment, loading, error } = useCreateAttachment();
  const [selectedDocumentType, setSelectedDocumentType] = useState<DocumentType | "">("");

  const form = useForm<AttachmentFormData>({
    resolver: zodResolver(attachmentSchema),
    defaultValues: {
      gdeType: "emissao",
      documentType: "proposta-estagio",
    },
  });

  const onSubmit = async (data: AttachmentFormData) => {
    try {
      await createAttachment(data);
      navigate("/attachments");
    } catch (err) {
      console.error("Erro ao criar attachment:", err);
    }
  };

  const handleDocumentTypeChange = (value: string) => {
    setSelectedDocumentType(value as DocumentType);
    form.setValue("documentType", value as DocumentType);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Novo Anexo
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Preencha os dados para criar um novo anexo
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Selecione o tipo de GDE e documento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="gdeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de GDE</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        {Object.entries(gdeTypeLabels).map(([value, label]) => (
                          <div key={value} className="flex items-center space-x-2">
                            <RadioGroupItem value={value} id={value} />
                            <Label htmlFor={value}>{label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="documentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Documento</FormLabel>
                    <Select
                      onValueChange={handleDocumentTypeChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de documento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(documentTypeLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormLabel>Arquivo</FormLabel>
                    <FormControl>
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          onChange(file);
                        }}
                        className="flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                      />
                    </FormControl>
                    <FormDescription>
                      Selecione o arquivo a ser anexado
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Campos específicos baseados no tipo de documento */}
          {selectedDocumentType && (
            <Card>
              <CardHeader>
                <CardTitle>Campos Específicos</CardTitle>
                <CardDescription>
                  Campos específicos para {documentTypeLabels[selectedDocumentType]}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Aqui você pode adicionar campos específicos baseados no selectedDocumentType */}
                <p className="text-sm text-slate-500">
                  Campos específicos para {documentTypeLabels[selectedDocumentType]} serão implementados conforme necessário.
                </p>
              </CardContent>
            </Card>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/attachments")}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loading message="Criando..." size="sm" />
              ) : (
                "Criar Anexo"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
