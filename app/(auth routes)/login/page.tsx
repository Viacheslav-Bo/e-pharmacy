import Image from "next/image";
import { Logo } from "@/components/Header/Logo/Logo";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import css from "./page.module.css";

export default function LoginPage() {
  console.log("🔥 LOGIN PAGE RENDER");
  return (
    <main className={css.wrapper}>
      <div className={css.content}>
        <div className={css.desctopContent}>
          <Logo />
          <div className={css.heroBlock}>
            <h1 className={css.heading}>
              Your medication, delivered Say goodbye to all
              <span className={css.accent}> your healthcare</span> worries with
              us
            </h1>
          </div>
        </div>
        <LoginForm />
      </div>
      <Image
        src="/pill.png"
        alt=""
        width={95}
        height={93}
        className={css.pillImage}
      />
      <div className={css.decorTop} />
      <div className={css.decorBottom} />
      <div className={css.decorTab} />
    </main>
  );
}
