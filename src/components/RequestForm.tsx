import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { preSubmitChecklist, site } from '../data/content';
import {
  ALLOWED_EXTENSIONS,
  ALLOWED_MIME_TYPES,
  FIELD_LABELS,
  FIELD_NAMES,
  MAX_FILE_BYTES,
  UPLOAD_HINT,
  formatBytes,
  isAllowedExtension,
  isAllowedMime,
  maskPhone,
  validateFields,
  type FieldName,
  type SolicitacaoFields,
  type ValidationErrors,
} from '../../shared/solicitacao';

const ACCEPT = [
  ...ALLOWED_EXTENSIONS.map((extension) => `.${extension}`),
  ...ALLOWED_MIME_TYPES,
].join(',');

const EMPTY: SolicitacaoFields = {
  responsavelNome: '',
  responsavelTelefone: '',
  responsavelEmail: '',
  alunoNome: '',
  alunoSerie: '',
  alunoSala: '',
};

const inputTypes: Partial<Record<FieldName, string>> = {
  responsavelTelefone: 'tel',
  responsavelEmail: 'email',
};

const autoCompletes: Partial<Record<FieldName, string>> = {
  responsavelNome: 'name',
  responsavelTelefone: 'tel',
  responsavelEmail: 'email',
};

const inputModes: Partial<Record<FieldName, 'tel' | 'email'>> = {
  responsavelTelefone: 'tel',
  responsavelEmail: 'email',
};

/** Campos que ocupam a linha inteira também no desktop. */
const fullWidth = new Set<FieldName>(['responsavelEmail', 'alunoSala']);

function validateFile(file: File | null): string | undefined {
  if (!file) return 'Anexe o comprovante da recarga.';
  if (file.size === 0) return 'O arquivo selecionado está vazio.';
  if (file.size > MAX_FILE_BYTES) return 'O arquivo precisa ter no máximo 10 MB.';
  if (!isAllowedExtension(file.name) || !isAllowedMime(file.type)) {
    return 'Formato não aceito. Envie PDF, JPG, PNG ou WEBP.';
  }
  return undefined;
}

export function RequestForm() {
  const baseId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState<SolicitacaoFields>(EMPTY);
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ confirmationSent: boolean } | null>(null);

  const setField = (name: FieldName) => (event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    const next = name === 'responsavelTelefone' ? maskPhone(raw) : raw;
    setValues((current) => ({ ...current, [name]: next }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const pickFile = (selected: File | null) => {
    setFile(selected);
    setErrors((current) => ({ ...current, comprovante: validateFile(selected) }));
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files?.[0] ?? null;
    if (dropped) pickFile(dropped);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setErrors((current) => ({ ...current, comprovante: 'Anexe o comprovante da recarga.' }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors: ValidationErrors = validateFields(values);
    const fileError = validateFile(file);
    if (fileError) nextErrors.comprovante = fileError;
    if (!consent) nextErrors.consentimento = 'É necessário confirmar as informações.';

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormError('Revise os campos destacados antes de enviar.');

      // Leva o foco ao primeiro campo com erro depois que o React aplica o estado.
      const firstInvalid = FIELD_NAMES.find((name) => nextErrors[name]);
      requestAnimationFrame(() => {
        const target = firstInvalid
          ? document.getElementById(`${baseId}-${firstInvalid}`)
          : formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
        target?.focus();
        target?.scrollIntoView({ block: 'center' });
      });
      return;
    }

    setFormError(null);
    setSubmitting(true);

    try {
      const payload = new FormData();
      for (const name of FIELD_NAMES) payload.append(name, values[name].trim());
      payload.append('consentimento', 'true');
      payload.append('comprovante', file as File);

      const response = await fetch('/api/solicitar-cashback', { method: 'POST', body: payload });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fields?: ValidationErrors;
        confirmationSent?: boolean;
      };

      if (!response.ok || !data.ok) {
        if (data.fields) setErrors(data.fields);
        setFormError(
          data.error ?? 'Não foi possível enviar sua solicitação agora. Verifique os dados e tente novamente.',
        );
        return;
      }

      setSuccess({ confirmationSent: data.confirmationSent !== false });
    } catch {
      setFormError(
        'Não foi possível enviar sua solicitação agora. Verifique sua conexão e tente novamente.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="solicitar" className="section bg-white">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-brand-blue">Formulário oficial</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Solicite seu cashback bônus
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              Preencha os dados abaixo e envie o comprovante da sua recarga.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mx-auto mt-10 max-w-3xl">
            {success ? (
              <SuccessPanel confirmationSent={success.confirmationSent} email={values.responsavelEmail} />
            ) : (
              <form
                ref={formRef}
                noValidate
                onSubmit={onSubmit}
                className="rounded-3xl border border-black/[0.07] bg-white p-6 shadow-card sm:p-8"
              >
                <Fieldset legend="Dados do responsável">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {(['responsavelNome', 'responsavelTelefone', 'responsavelEmail'] as FieldName[]).map(
                      (name) => (
                        <Field
                          key={name}
                          name={name}
                          baseId={baseId}
                          value={values[name]}
                          error={errors[name]}
                          onChange={setField(name)}
                          disabled={submitting}
                        />
                      ),
                    )}
                  </div>
                </Fieldset>

                <Fieldset legend="Dados do aluno" className="mt-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {(['alunoNome', 'alunoSerie', 'alunoSala'] as FieldName[]).map((name) => (
                      <Field
                        key={name}
                        name={name}
                        baseId={baseId}
                        value={values[name]}
                        error={errors[name]}
                        onChange={setField(name)}
                        disabled={submitting}
                      />
                    ))}
                  </div>
                </Fieldset>

                <Fieldset legend="Comprovante da recarga" className="mt-8">
                  <div
                    onDragOver={(event) => {
                      event.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    className={`rounded-2xl border-2 border-dashed p-5 transition-colors sm:p-6 ${
                      errors.comprovante
                        ? 'border-brand-red/50 bg-brand-red-soft/40'
                        : dragging
                          ? 'border-brand-blue bg-brand-blue-soft'
                          : 'border-black/15 bg-surface'
                    }`}
                  >
                    {file ? (
                      <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-blue-soft text-brand-blue">
                          <Icon name="file" className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[15px] font-bold text-ink">{file.name}</p>
                          <p className="text-[13px] text-ink-light">{formatBytes(file.size)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          disabled={submitting}
                          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-black/10 bg-white text-[#a92e2e] transition-colors hover:bg-brand-red-soft disabled:opacity-50"
                          aria-label={`Remover o arquivo ${file.name}`}
                        >
                          <Icon name="trash" className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-blue-soft text-brand-blue">
                          <Icon name="upload" className="h-6 w-6" />
                        </span>
                        <p className="mt-3 hidden text-[15px] font-semibold text-ink sm:block">
                          Arraste o comprovante aqui
                        </p>
                        <p className="mt-1 hidden text-[13px] text-ink-light sm:block">ou</p>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={submitting}
                          className="btn-secondary mt-3 w-full sm:w-auto"
                        >
                          Selecionar comprovante
                        </button>
                      </div>
                    )}

                    <input
                      ref={fileInputRef}
                      id={`${baseId}-comprovante`}
                      type="file"
                      accept={ACCEPT}
                      // O input fica fora da ordem de tabulação: quem navega por
                      // teclado usa o botão visível, que tem foco perceptível.
                      tabIndex={-1}
                      className="sr-only"
                      aria-invalid={errors.comprovante ? true : undefined}
                      aria-describedby={`${baseId}-comprovante-hint`}
                      onChange={(event) => pickFile(event.target.files?.[0] ?? null)}
                      disabled={submitting}
                    />
                  </div>

                  <p id={`${baseId}-comprovante-hint`} className="mt-2 text-[13px] text-ink-light">
                    {UPLOAD_HINT}
                  </p>
                  {errors.comprovante && <ErrorText>{errors.comprovante}</ErrorText>}
                </Fieldset>

                <div className="mt-8">
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 bg-surface p-4">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(event) => {
                        setConsent(event.target.checked);
                        setErrors((current) => ({ ...current, consentimento: undefined }));
                      }}
                      disabled={submitting}
                      aria-invalid={errors.consentimento ? true : undefined}
                      className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-brand-blue"
                    />
                    <span className="text-[15px] leading-relaxed text-ink">
                      Confirmo que as informações acima estão corretas e autorizo seu uso para análise e
                      processamento desta solicitação de cashback bônus.
                    </span>
                  </label>
                  {errors.consentimento && <ErrorText>{errors.consentimento}</ErrorText>}
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-light">
                    Os dados informados serão utilizados apenas para processar esta solicitação de cashback
                    bônus.
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-black/[0.07] bg-surface p-5">
                  <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-brand-blue">
                    Antes de enviar
                  </p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {preSubmitChecklist.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[15px] text-ink">
                        <Icon name="check" className="h-4 w-4 shrink-0 text-brand-blue" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#regulamento"
                    className="mt-3 inline-flex text-[14px] font-semibold text-brand-blue underline decoration-brand-blue/40 underline-offset-4 hover:decoration-brand-blue"
                  >
                    Ver regulamento completo
                  </a>
                </div>

                {formError && (
                  <p
                    role="alert"
                    className="mt-6 flex items-start gap-2 rounded-2xl border border-brand-red/30 bg-brand-red-soft px-5 py-4 text-[15px] font-semibold text-[#a92e2e]"
                  >
                    <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0" />
                    {formError}
                  </p>
                )}

                <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full disabled:opacity-70">
                  {submitting ? (
                    <>
                      <Icon name="spinner" className="h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Icon name="send" className="h-5 w-5" />
                      Enviar comprovante
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-[13px] leading-relaxed text-ink-light">
                  A solicitação é encaminhada para {site.email} e uma confirmação é enviada para o e-mail do
                  responsável.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Fieldset({
  legend,
  className = '',
  children,
}: {
  legend: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className={className}>
      <legend className="eyebrow mb-4 text-brand-blue">{legend}</legend>
      {children}
    </fieldset>
  );
}

function ErrorText({ children }: { children: ReactNode }) {
  return <p className="mt-1.5 text-[13px] font-semibold text-[#a92e2e]">{children}</p>;
}

function Field({
  name,
  baseId,
  value,
  error,
  onChange,
  disabled,
}: {
  name: FieldName;
  baseId: string;
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}) {
  const id = `${baseId}-${name}`;
  const errorId = `${id}-erro`;

  return (
    <div className={fullWidth.has(name) ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {FIELD_LABELS[name]}
        <span aria-hidden="true" className="text-brand-red">
          {' '}
          *
        </span>
      </label>
      <input
        id={id}
        name={name}
        type={inputTypes[name] ?? 'text'}
        inputMode={inputModes[name]}
        autoComplete={autoCompletes[name]}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`mt-2 min-h-[52px] w-full rounded-2xl border bg-white px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-light disabled:opacity-60 ${
          error
            ? 'border-brand-red/60 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20'
            : 'border-black/10 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25'
        }`}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-[13px] font-semibold text-[#a92e2e]">
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessPanel({ confirmationSent, email }: { confirmationSent: boolean; email: string }) {
  return (
    <div
      role="status"
      className="rounded-3xl border border-brand-orange/35 bg-brand-orange-soft p-8 text-center sm:p-10"
    >
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-blue text-white">
        <Icon name="check" className="h-8 w-8" />
      </span>

      <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        Solicitação enviada com sucesso!
      </h3>

      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
        {confirmationSent ? (
          <>
            Enviamos uma cópia da solicitação para <strong className="text-ink">{email}</strong>, o e-mail do
            responsável informado no formulário.
          </>
        ) : (
          <>
            Sua solicitação chegou à equipe da {site.brand}. Não conseguimos enviar a cópia de confirmação
            para {email}, mas isso não afeta a análise do seu pedido.
          </>
        )}
      </p>

      <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        O cashback bônus será analisado pela equipe da {site.brand} e poderá ser creditado em até{' '}
        {site.creditDeadline}, conforme as condições da promoção.
      </p>
    </div>
  );
}
