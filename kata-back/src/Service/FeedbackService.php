<?php


namespace App\Service;

use App\Entity\Feedback;
use Doctrine\ORM\EntityManagerInterface;

class FeedbackService
{
    public function __construct(private EntityManagerInterface $em)
    {
    }

    public function getFeedbacks(): array
    {
        $feedbacks = $this->em->getRepository(Feedback::class)->findAll();
        $data = array_map(fn($feedback) => [
            'id' => $feedback->getId(),
            'firstname' => $feedback->getFirstName(),
            'lastname' => $feedback->getLastName(),
            'email' => $feedback->getEmail(),
            'comment' => $feedback->getComment(),
        ], $feedbacks);
        return $data; 
    }

    public function createFeedbackFromData(array $data): Feedback
    {
        if (
            empty($data['firstName']) ||
            empty($data['lastName']) ||
            empty($data['email']) ||
            empty($data['comment'])
        ) {
            throw new \InvalidArgumentException('Missing required feedback fields.');
        }

        $feedback = new Feedback();
        $feedback->setFirstName($data['firstName']);
        $feedback->setLastName($data['lastName']);
        $feedback->setEmail($data['email']);
        $feedback->setComment($data['comment']);
        
        $this->em->persist($feedback);
        $this->em->flush();

        return $feedback;
    }

}
