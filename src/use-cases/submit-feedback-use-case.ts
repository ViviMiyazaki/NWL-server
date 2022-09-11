import { MailAdapter } from "../adapter.ts/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {

constructor(
   private feedbacksRepository: FeedbacksRepository,
   private mailAdapter: MailAdapter,
   ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body:[
        `<div style: "font-size:16px";>`,
        `<p>tipo de feedback: ${type}/p>`,
        screenshot ? `<img src= "${screenshot}" />` : ``,
        `</div>`
      ].join('\n')
    })
  }
}