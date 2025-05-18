<?php 

namespace App\Service;

use App\Entity\Question;
use Doctrine\ORM\EntityManagerInterface;

class QuestionService
{
    public function __construct(private EntityManagerInterface $em)
    {
    }

    public function addQuestion(string $name): Question
    {
        $question = new Question();
        $question->setName($name);

        $this->em->persist($question);
        $this->em->flush();

        return $question;
    }

    public function editQuestion(int $id, string $name): Question|bool
    {
        $question = $this->em->getRepository(Question::class)->find($id);
        if(!$question){
            return false;
        }
        $question->setName($name);
        $this->em->flush();

        return $question;
    }

    public function deleteQuestion(int $id): bool
    {
        $question = $this->em->getRepository(Question::class)->find($id);

        if (!$question) {
            return false;
        }

        $this->em->remove($question);
        $this->em->flush();

        return true;
    }
}