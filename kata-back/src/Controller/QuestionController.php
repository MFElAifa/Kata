<?php 

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Service\QuestionService;

#[Route("/api")]
class QuestionController extends AbstractController
{
    #[Route("/question", name: "add_question", methods:['POST'])]
    public function addQuestion(Request $request, QuestionService $questionService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $name = $data['name'] ?? null;

        if (!$name) {
            return $this->json(['error' => 'Missing question name'], 400);
        }
        
        $questionService->addQuestion($name);
        
        return $this->json(['message' => 'Question added'], 201);
    } 

    #[Route("/question/{id}", name: "edit_question", methods:['PUT'])]
    public function editQuestion($id, Request $request, QuestionService $questionService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $name = $data['name'] ?? null;

        if (!$name) {
            return $this->json(['error' => 'Missing question name'], 400);
        }

        $result = $questionService->editQuestion($id, $name);

        if(!$result){
            return $this->json(['error' => 'Question not found'], 404);
        }

        return $this->json(['message' => 'Question updated']);
    } 

    #[Route("/question/{id}", name: "remove_question", methods:['DELETE'])]
    public function deleteQuestion($id, QuestionService $questionService): JsonResponse
    {
        $result = $questionService->deleteQuestion($id);

        if(!$result){
            return $this->json(['error' => 'Question not found'], 404);
        }

        return $this->json(['message' => 'Question deleted']);
    } 
}